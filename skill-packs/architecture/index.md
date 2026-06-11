# Architecture Skill Pack

Use this pack when an agent needs to choose module boundaries.

- Start with the smallest coherent monolith.
- Split by workflow ownership, not by premature technical layers.
- Define routes/controllers/components at the edge, domain services in the center, and adapters for payment/mail/storage/API providers.
- Add tests at the contract boundary first.
