# Configuração do Google Search API

## 1. Ativar Google Custom Search API

1. Acesse: https://console.cloud.google.com/
2. Crie um projeto ou selecione um existente
3. Ative a "Custom Search JSON API"
4. Crie credenciais (API Key)

## 2. Criar Custom Search Engine

1. Acesse: https://cse.google.com/cse/
2. Clique em "Add"
3. Configure:
   - Sites to search: `*` (busca em toda web)
   - Language: Portuguese
4. Copie o "Search Engine ID"

## 3. Adicionar variáveis ao .env

```bash
GOOGLE_SEARCH_API_KEY=sua_api_key_aqui
GOOGLE_SEARCH_ENGINE_ID=seu_search_engine_id_aqui
```

## 4. Custos

- **Cota gratuita:** 100 consultas/dia
- **Custo pago:** $5 por 1.000 consultas
- **Estimativa:** ~$0,005 por consulta

## 5. Alternativa Gratuita

Para desenvolvimento/testes, você pode:
- Usar apenas o banco interno (sem custo)
- Implementar busca manual quando necessário
