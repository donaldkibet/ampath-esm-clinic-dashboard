# `@ampath/esm-client-dashboard`

A monorepo for all the different clinic dashboard widgets.

## Available Packages

- HIV-related dashboard items
  * Lists (...)
  * Visualizations (...)
  * Reports (...)
- Oncology related items
  * Lists (...)
- Diabetes related items
  * Lists (...)

## Commands

If you want to debug a certain microfrontend (e.g., `@ampath/esm-clinic-dashboard-oncology-lists`):

```sh
name=oncology-lists yarn debug
```

For changing the port please use `port` (e.g., `8085`):

```sh
port=8085 yarn debug
```

Of course, you can combine these:

```sh
port=8085 name=oncology-lists yarn debug
```

By default, port `8080` and `@ampath/esm-clinic-dashboard-hiv-lists` is taken.
