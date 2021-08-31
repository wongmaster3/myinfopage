# Myinfopage

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
The following steps assume we are using github pages.
1. First we need to build the application. Run:

```bash
ng build --prod --base-href "https://mattwong77.info"
```

2. Next we need to push the built project to another branch called ```gh-pages``` by running:

```bash
npx angular-cli-ghpages —-dir=dist/myinfopage
```

3. Go to Github > Settings > Pages. Make sure the ```Source``` has the branch ```gh-pages``` and the folder as ```root```. Also add the custom domain name and enable https.

Reference: [Launch Angular App to Github Pages Tutorial](https://medium.com/tech-insights/how-to-deploy-angular-apps-to-github-pages-gh-pages-896c4e10f9b4)

## Credits
Credits to https://html5up.net/ for the design
Credits to https://unsplash.com for the nice picture.

