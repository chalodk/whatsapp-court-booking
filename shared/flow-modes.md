# Flow Modes

{{FLOW_MODE}} is either `dynamic` or `hourly`. After setup, keep the matching section and remove the other one.

{{?DYNAMIC_FLOW}}

## Dynamic Daily Flow

One WhatsApp Flow per day. A data endpoint reads the club base when the player opens the Flow and shows only slots that are free at that moment.

- Send once, when the booking window opens.
- Do not send an hourly summary.
- The endpoint returns free slots only. It does not offer a taken court.

{{/DYNAMIC_FLOW}}

{{?HOURLY_DIGEST}}

## Hourly Static Digest

One static Flow each hour. The message lists every court and its status so the player does not open one message per court.

- Send at the start of each operating hour.
- Slots are fixed when the message is sent. There is no data endpoint.
- The next hour sends a new message with the updated picture.

{{/HOURLY_DIGEST}}
