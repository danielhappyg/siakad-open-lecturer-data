# Open Lecturer Data Module

Throwaway Kaprodi mockup for SIAKAD Direktori Dosen (presentation build).

## Links

- GitHub: https://github.com/danielhappyg/siakad-open-lecturer-data
- Live (Vercel): import this repo in the Vercel dashboard with Root Directory `prototype`, then turn off Deployment Protection / Vercel Authentication so the room can open it without a Vercel login

## Local

```bash
python3 -m http.server 8765 --directory prototype
```

Then open `http://127.0.0.1:8765/`.

## Scope

See `PRODUCT.md` and `DESIGN.md`. This is not the production SIAKAD module.
