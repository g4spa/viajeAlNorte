# Bitácora del Norte

Sitio estático e interactivo para documentar el viaje de Yamila y Gaspar por Jujuy y Salta.

## Qué incluye

- Landing responsive con una identidad visual editorial inspirada en la puna y las yungas.
- Timeline del itinerario de 11 días, con datos editables en `data.js`.
- Diario personal: permite guardar entradas, destino, fecha y estado de ánimo.
- Sincronización opcional con Supabase: PostgreSQL para datos y Storage privado para fotos/videos.
- El modo sin configuración mantiene una vista local para desarrollo; al configurar Supabase, el acceso pasa por email y contraseña.
- Galería con filtros por tipo y favoritos para destacar momentos especiales.
- Mapa visual del recorrido, clima actual por destino y acceso al estado oficial de rutas.
- Checklist persistente y barra de progreso.
- Presupuesto con tres escenarios: simple, intermedio y cómodo.
- Cuenta regresiva, modo privado y resumen final con estadísticas del viaje.
- Exportación para imprimir la bitácora y respaldo/restauración JSON de los datos escritos.
- No requiere build, dependencias ni servidor: se puede publicar como sitio estático.

## Uso local

Abrí `index.html` en un navegador moderno. Para probar la carga de archivos con máxima compatibilidad, serví la carpeta con cualquier servidor estático:

```bash
python -m http.server 8000
```

Luego visitá `http://localhost:8000`.

## Publicar

El proyecto es compatible con GitHub Pages, Netlify, Vercel o cualquier hosting de archivos estáticos. En Netlify, por ejemplo, el directorio de publicación es la raíz (`.`) y no hace falta comando de build.

## Editar contenido

- `data.js`: itinerario, rutas, actividades, checklist y escenarios de presupuesto.
- `index.html`: estructura y textos de la interfaz.
- `styles.css`: sistema visual y responsive.
- `app.js`: interacciones y persistencia local.
- `supabase-schema.sql`: tablas, RLS y bucket privado para ejecutar en Supabase.
- `supabase-config.example.js`: plantilla de configuración. La copia local `supabase-config.js` está ignorada por Git.

## Conectar Supabase

1. Crear un proyecto en [Supabase](https://supabase.com).
2. Ejecutar `supabase-schema.sql` desde **SQL Editor**.
3. En **Authentication > Providers > Email**, habilitar Email.
4. Copiar `supabase-config.example.js` como `supabase-config.js`.
5. Completar `url` y `anonKey` desde **Project Settings > API**. Solo usar la clave `anon`; nunca `service_role`.
6. Servir la raíz del proyecto y crear las cuentas privadas de Yamila y Gaspar desde la pantalla de la bitácora.

Con la configuración activa, el diario, checklist, favoritos y archivos se sincronizan entre dispositivos. El modo local queda como fallback de desarrollo cuando todavía no se configuraron credenciales.
