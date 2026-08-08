# TALHE

E-commerce de moda masculina — projeto de portfólio da [Evolutiva Tech](https://evolutivatech.com.br).

**Desenvolvido por [Davi Barbosa da Silva](https://github.com/Davi-silv)** · [Repositório](https://github.com/Davi-silv/talhe)

## Stack

- React + TypeScript + Vite + Tailwind CSS
- Supabase Auth
- Mercado Pago (próximas etapas)
- Deploy: Vercel

## Desenvolvimento

```bash
npm install
cp .env.example .env.local
npm run dev
```

Preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` com o projeto Supabase. Em Authentication → URL Configuration, adicione `http://localhost:5173`.

## Etapas

- [x] Etapa 1 — Scaffold, design system e home
- [x] Etapa 2 — Catálogo
- [x] Etapa 3 — Carrinho
- [x] Etapa 4 — Auth
- [ ] Etapa 5 — Checkout / Mercado Pago
- [ ] Etapa 6 — Pedidos / admin
- [ ] Etapa 7 — Polish e deploy
