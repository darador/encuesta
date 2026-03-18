# Guía de Despliegue (Supabase + Vercel)

Esta guía te llevará paso a paso para desplegar tu aplicación "Employee Feedback" de forma gratuita.

## 1. Prepara tu Repositorio en GitHub
Para desplegar fácilmente en Vercel, tu código debe estar en un repositorio de GitHub. 
1. Crea un nuevo repositorio en [GitHub](https://github.com/new).
2. Abre la terminal en esta misma carpeta y ejecuta los siguientes comandos:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <URL_DE_TU_NUEVO_REPOSITORIO>
   git push -u origin main
   ```

## 2. Configura la Base de Datos en Supabase
1. Inicia sesión en [Supabase](https://supabase.com).
2. Haz clic en **"New Project"**.
3. Ponle un nombre (por ejemplo, `employee-feedback`), una contraseña segura y elige tu región preferida. Luego haz clic en "Create new project". (Esto toma un par de minutos).
4. Cuando el proyecto esté listo, ve al menú izquierdo y selecciona el **SQL Editor**.
5. Haz clic en **"New query"**.
6. Copia todo el contenido del archivo `database.sql` (que se encuentra en esta misma carpeta) y pégalo en el editor SQL.
7. Presiona **"Run"** (o Cmd/Ctrl + Enter). Esto creará la tabla `responses` y sus reglas de seguridad.
8. Ve a **"Project Settings"** (el icono de engranaje) y entra a **"API"**.
9. En la sección "Project URL", copia tu **URL**.
10. En la sección "Project API keys", copia tu llave **`anon` `public`**.
Tendremos que usar estos dos valores (URL y clave anon) en el siguiente paso con Vercel.

## 3. Despliega en Vercel
1. Ve a [Vercel](https://vercel.com) e inicia sesión usando GitHub.
2. Haz clic en el botón de **"Add New..."** y elige **"Project"**.
3. Verás la lista de tus repositorios; busca el que creamos en el Paso 1 y haz clic en **"Import"**.
4. En la configuración ("Configure Project"):
   - El Framework Preset debe detectarse automáticamente como "Next.js".
   - Despliega la sección **"Environment Variables"**.
5. Agrega las dos variables de entorno usando los datos que copiaste de Supabase:
   - **Nombre:** `NEXT_PUBLIC_SUPABASE_URL` | **Valor:** `<Tu_Project_URL_de_Supabase>`
   - **Nombre:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Valor:** `<Tu_Clave_Anon_de_Supabase>`
6. Haz clic en **"Deploy"**.

¡Eso es todo! Vercel comenzará a construir tu aplicación y, al terminar, te dará un dominio público seguro (URL) donde tu aplicación de retroalimentación de empleados estará completamente viva y funcional.
