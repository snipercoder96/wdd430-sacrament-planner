# SACRAMENT PLANNER

- This sacrament planner was made by Kevin Mbemba Kiyindou

## Accounts and roles

Anyone can create an account at `/auth/signup`. Passwords are bcrypt-hashed before they are saved, and public sign-ups receive the `visitor` role. To grant admin access, update the account's role in the Neon database:

```sql
UPDATE users
SET role = 'admin'
WHERE email = 'admin@example.com';
```

The account must sign out and back in for the new role to take effect in its session.

## Color Schemes
### Background color
- Background: #F9FAFB

### Header and Nav
- Background: Deep Navy #1A2A40

- Text: White #FFFFFF

- Hover Links: Royal Blue #3B82F6

- Box Shadow (Header): 0 2px 6px rgba(0,0,0,0.4)

### Meeting Card
- Background: Soft Gray #F3F4F6

- Border: 1px solid #E5E7EB

- Hover: Slight lift (transform: scale(1.02)) + shadow 0 4px 8px rgba(0,0,0,0.1)

- Title Text: Charcoal #111827

- Meta Text (date, type): Slate Gray #6B7280

