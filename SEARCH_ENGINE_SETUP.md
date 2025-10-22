# Configuração do Google Search Engine ID

## Passo 1: Criar Custom Search Engine

1. Acesse: https://cse.google.com/cse/
2. Clique em "Add" (Adicionar)
3. Configure:
   - **Sites to search:** `*` (para buscar em toda web)
   - **Language:** Portuguese (Brasil)
   - **Name:** MCP Search Engine
4. Clique em "Create"

## Passo 2: Obter Search Engine ID

1. Após criar, clique em "Control Panel"
2. Copie o **Search Engine ID** (exemplo: 017576662512468239146:omuauf_lfve)

## Passo 3: Adicionar ao arquivo .env.local

```bash
GOOGLE_SEARCH_API_KEY=AIzaSyD2JguxEntVPYlITEi0QconHiFigfOagfs
GOOGLE_SEARCH_ENGINE_ID=seu_search_engine_id_aqui
```

## Passo 4: Reiniciar o servidor

```bash
npm run dev
```

## Cota Gratuita

- ✅ **100 consultas por dia** - Gratuito
- ✅ **Suficiente para testes** e uso pessoal
- 💰 **Custo:** $5 por 1.000 consultas (após cota gratuita)
