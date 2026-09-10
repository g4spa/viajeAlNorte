# Bitácora del Norte

Sitio estático e interactivo para documentar el viaje de Yamila y Gaspar por Jujuy y Salta.

## Qué incluye

- Landing responsive con una identidad visual editorial inspirada en la puna y las yungas.
- Timeline del itinerario de 11 días, con datos editables en `data.js`.
- Diario personal: permite guardar entradas, destino, fecha y estado de ánimo.
- Álbum local de fotos y videos usando IndexedDB. Los archivos quedan en el navegador del dispositivo donde se cargan.
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

La bitácora local es ideal para el viaje y mantiene el contenido privado. El respaldo JSON permite mover textos y checklist entre dispositivos; los archivos multimedia permanecen en el almacenamiento local del navegador. Para sincronización automática entre celulares habría que conectar un proyecto Supabase o Firebase con sus credenciales, decisión que se dejó fuera para no publicar datos personales ni secretos en el repositorio.
