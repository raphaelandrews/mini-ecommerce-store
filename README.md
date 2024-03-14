# PeachMango Store

## Clone

```bash
git clone https://github.com/raphaelandrews/peach-mango.git
cd peach-mango
code .
pnpm install
```

## Setup .env files
### You can use .env.example

```bash
#clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/:locale/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/:locale/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

#api
NEXT_PUBLIC_API_URL=
```

## Run the App

```bash
pnpm dev
```
