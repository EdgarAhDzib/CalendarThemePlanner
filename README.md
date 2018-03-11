# CalendarThemePlanner

A MERN (MongoDB / Express / React / Node) application to display, edit, and store notes for a superhero-themed calendar.

Options to read and modify content are publicly available. Changes can only be saved with login access, which controls server-side database saving.

The app is initialized by loading database content and applying it, via React display, to any of the months, each to have a unique photographic theme. Axios executes POST and GET methods for the Node routes, accessed from a set of server files.

The photo model logs in via a Passport validator. Once logged in, buttons to save changes appear at the top and bottom of the page.
