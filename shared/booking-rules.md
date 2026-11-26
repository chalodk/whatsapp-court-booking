# Booking Rules

How a free hour becomes a booking. The club's own policy and restrictions are in `club-context/identity.md` under Fill policy and Restrictions. This file is the mechanism.

## Goal

Fill open hours. The admin should not have to message players one by one.

## Priority

Apply the Fill policy from the identity file in this order:

1. Keep a slot that the admin already assigned.
2. Keep a slot that a player accepted in a Flow.
3. Offer the remaining free slots to players of that sport.

If two players accept the same slot, the first acceptance written to the agenda wins. The other player gets the next free slot of that sport.

## Conflicts

- A court has one booking at a time.
- A booking names the sport, the court, the day, the start, the end, and who is playing.
- A restriction from the identity file removes that window before any offer goes out.

## Admin override

The admin can say who plays, on which court, and at what time. That assignment replaces an open slot. It does not erase another player's confirmed booking unless the admin says to move that player.

## What this file does not do

Kapso workflows are built with `skills/automate-whatsapp`. This file says what the workflow must respect. It does not say which Kapso calls to make.
