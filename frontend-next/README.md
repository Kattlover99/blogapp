# Devagram

DEMO Login: admin@admin.com

DEMO Senha: admin

## Used Technologies

1. **Next:** 13.0.2
1. **React:** 18.2.0
1. **Nodejs:** 18.12.1
1. **SASS:** 1.56.0

## Setting up the local server

1. Using [GIT](https://git-scm.com/), Clone the repository with the command:
```bash
git clone https://github.com/d1av/instagram-frontend-nextjs.git
```
2. Create an .env.local in your cloned local repository folder
3. Copy the variables from .env.example into you .env.local
4. Change the variable in your .env.local to match your API url
5. Choose beetwen two possible methods to run it, Docker or Local Server

<details>
<summary> <strong style="font-size: 30px">Local Server
</strong>
</summary>

First, run the development server:

```bash
npm install

npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

</details>

<details>
<summary> <strong style="font-size: 30px">Using Docker
</strong>
</summary>

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Build your container: `docker build -t nextjs-docker .`.
3. Run your container: `docker run -p 3000:3000 nextjs-docker`.

You can view your images created with `docker images`.

</details>
