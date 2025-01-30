```mermaid
sequenceDiagram
    participant FE as クライアント
    participant BE as サーバー

    FE ->> BE: `/api/create`
    BE ->> VertexAI: リクエスト（認証・認可）
    VertexAI ->> BE: 返却
    BE ->> FE: 返却
```
