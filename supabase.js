const supabaseConfig = window.SUPABASE_CONFIG || {};
const supabaseReady = Boolean(
  supabaseConfig.url &&
  supabaseConfig.anonKey &&
  !supabaseConfig.url.includes('TU-PROJECT')
);

window.noaCloud = {
  enabled: supabaseReady,
  client: supabaseReady
    ? window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey)
    : null,
  async user() {
    if (!this.client) return null;
    const { data, error } = await this.client.auth.getUser();
    if (error && error.name !== 'AuthSessionMissingError') throw error;
    return data?.user || null;
  },
  async signIn(email, password) {
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  },
  async signUp(email, password) {
    const { data, error } = await this.client.auth.signUp({ email, password });
    if (error) throw error;
    return data.user;
  },
  async signOut() {
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  },
  async loadData(userId) {
    const [memories, checklist, favorites, media] = await Promise.all([
      this.client.from('memories').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      this.client.from('checklist_items').select('*').eq('user_id', userId).order('position'),
      this.client.from('favorites').select('*').eq('user_id', userId),
      this.client.from('media').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    ]);
    const failed = [memories, checklist, favorites, media].find(result => result.error);
    if (failed) throw failed.error;
    const mediaWithUrls = await Promise.all(media.data.map(async item => {
      const { data, error } = await this.client.storage.from('noa-media').createSignedUrl(item.storage_path, 3600);
      if (error) throw error;
      return { ...item, url: data.signedUrl, name: item.file_name, type: item.mime_type };
    }));
    return { memories: memories.data, checklist: checklist.data, favorites: favorites.data, media: mediaWithUrls };
  },
  async insertMemory(userId, memory) {
    const { data, error } = await this.client.from('memories').insert({ user_id: userId, text: memory.text, place: memory.place, memory_date: memory.date || null, mood: memory.mood }).select().single();
    if (error) throw error;
    return data;
  },
  async updateChecklist(userId, label, completed, position) {
    const { error } = await this.client.from('checklist_items').upsert({ user_id: userId, label, completed, position }, { onConflict: 'user_id,label' });
    if (error) throw error;
  },
  async uploadMedia(userId, file) {
    const path = `${userId}/${crypto.randomUUID()}-${file.name}`;
    const upload = await this.client.storage.from('noa-media').upload(path, file, { contentType: file.type, upsert: false });
    if (upload.error) throw upload.error;
    const record = await this.client.from('media').insert({ user_id: userId, storage_path: path, file_name: file.name, mime_type: file.type }).select().single();
    if (record.error) throw record.error;
    const signed = await this.client.storage.from('noa-media').createSignedUrl(path, 3600);
    if (signed.error) throw signed.error;
    return { ...record.data, url: signed.data.signedUrl, name: file.name, type: file.type };
  }
};
