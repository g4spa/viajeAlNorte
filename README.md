# 🌵 Viaje al Norte Argentino · Sept 2026

Planificador de viaje para Yam + Gaspar. Jujuy · Salta · Septiembre 2026.

## Estructura del proyecto

```
viaje-al-norte/
├── index.html          # Estructura HTML, sin lógica ni datos
├── css/
│   └── styles.css      # Todo el CSS
├── js/
│   ├── data.js         # Arrays de datos del viaje (días, rutas, presupuesto, etc.)
│   ├── render.js       # Funciones que generan el DOM a partir de los datos
│   └── app.js          # Lógica, eventos e inicialización
├── .gitignore
└── README.md
```

## Subir a GitHub

```bash
# 1. Inicializá el repo (solo la primera vez)
git init
git add .
git commit -m "first commit"

# 2. Creá el repo en github.com, luego:
git remote add origin https://github.com/TU_USUARIO/viaje-al-norte.git
git branch -M main
git push -u origin main

# Para actualizar después:
git add .
git commit -m "descripción del cambio"
git push
```

## Deploy en Netlify

### Opción A — Drag & drop (más fácil)
1. Entrá a [app.netlify.com](https://app.netlify.com)
2. Arrastrá la carpeta `viaje-al-norte/` al área de deploy
3. Listo — te da una URL pública

### Opción B — Conectado a GitHub (recomendado)
1. En Netlify → **Add new site** → **Import an existing project**
2. Conectá tu cuenta de GitHub
3. Seleccioná el repo `viaje-al-norte`
4. Configuración de build:
   - **Base directory:** (vacío)
   - **Publish directory:** `.` (punto)
   - **Build command:** (vacío — es HTML estático, no necesita build)
5. **Deploy site**

Cada vez que hagas `git push`, Netlify redeploya automáticamente.

## Modificar datos del viaje

Todo el contenido está en `js/data.js`:
- `days` → itinerario día a día
- `aloj` → alojamientos
- `routes` → tramos de ruta
- `acts` → actividades por destino
- `checks` → checklist logístico
- `scenarios` → presupuesto (eco / mid / com)
- `igSlots` → slots de Instagram predefinidos
