# QuestMaster

This project is currently in development. It is an accessible mobile-friendly appointment-booking application allowing customers to book appointments with particular staff members, as is common at salons, barber shops, spas, and similar establishments. It also houses profile data for staff members, allows staff members to view their appointment schedules and edit their personal profiles, and offers a protected admins-only dashboard enabling advanced settings options and full managmenet of appointments and staff accounts. The implementation of these features is ongoing; stay tuned for more info!

## Project Roadmap

### MVP

> **Full list of core technologies:**
>
> - Express.js for API routing and architecture
>
> - Node.js for server environment
>
> - Mongoose ODM for object-document mapping, DB connectivity, > and CRUD operations
>
> - MongoDB Atlas for server database
>
> - BCrypt for hash encryption
>
> - JWT for user sessions
>
> - React.js for front-end architecture
>
> - React Router for page routing
>
> - Cloudinary API for image hosting/upload

**Criteria:**

```md
WHEN a client user comes to the public-facing homepage
THEN they can access a portal to easily book an appointment with a staff user
WHEN a client user books an appointment
THEN they are provided with a detailed confirmation notice
WHEN a staff user creates an admin account
THEN they can create / delete non-admin staff accounts and view/modify/cancel appointments
WHEN any staff user logs into their account
THEN they can view their appointments and customize their public profile

Business settings (weekly opening hours, timezone, and booking window) are statically-hosted
```

### Phase 2

> **Technology changes:**
>
> - Refactor project with TypeScript and Next.js

**Criteria:**

```md
WHEN a staff user with admin privileges logs into their account
THEN they have access to advanced settings (set business hours, timezone, booking window)
WHEN a client user books an appointment
THEN they receive an email confirmation
WHEN a client user receives a confirmation email
THEN they also receive a secure link allowing them to modify their appointment details
WHEN a staff user views upcoming appointments
THEN a notifications tab alerts them of newly-booked appointments

Business settings are hosted on server database
```

### Possible Future Development

> - Modularize project for implementation in a variety of >business models
>
> - Rebrand upgraded (non-MVP) project (e.g. “QuestMaster+” or >“QMAdvanced”)
>
> - Text message notifications
