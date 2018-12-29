---
title: "Build a static site generator in 40 lines with Node.js"
date: "2017-09-14T21:34:36.069Z"
---
> [Leia em Português](./construindo-gerador-site-estatico-40-linhas-nodejs-f1902dd41adb)

There are excellent **static site generators** out there, in different languages, with lots of features, but actually building your own is easier than you might think, and we learn some things in the process.

![](./1_qedPrFYGXlsbmjDl7lnVmg.jpeg)

## Why build your own?

When I was planning to build my own personal website — a simple portfolio-like site, with few pages, with some info about myself, my skills and projects — I decided it should be static (it’s fast, no need to setup a backend and can be hosted anywhere). I had some experience with [**Jekyll**](https://jekyllrb.com/), [**Hugo**](https://gohugo.io/) and [**Hexo**](https://hexo.io/), but I think they have too many features for my simple project. So I thought it shouldn’t be that hard to build something small, with just the features I need.

## The requirements

The requirements this generator must satisfy are:

*   Generate HTML files from [**EJS**](http://ejs.co/)  templates
*   Have a layout file, so all pages have the same header, footer, navigation, etc.
*   Allow partials (blocks of reusable interface components)
*   Read global site config from a file (site title, description, etc.)
*   Read data from JSON files. For example: list of projects, so I can easily iterate and build the “Projects” page

> **Why EJS templates?**  
> Because EJS is simple. There is no new template language to learn. It’s just JavaScript embedded in HTML.

## Folder structure

public/  
src/  
  assets/  
  data/  
  pages/  
  partials/  
  layout.ejs  
site.config.js

*   **public:** where the generated site will be.
*   **src:** the source of the site contents.  
    **src/assets:** contains CSS, JS, images, etc.  
    **src/data:** contains JSON data.  
    **src/pages:** are the templates that will be rendered to HTML. The directory structure found here will be replicated in the resulting site.  
    **src/partials:** contains our reusable partials.  
    **src/layout.ejs:** contains the common page structure, with a special   
    `<%- body %>` placeholder, where the contents of each page will be inserted.
*   **site.config.js**: it just exports an object that will be available in the page templates.

## The generator

The generator code is inside a single file, _scripts/build.js_, that we can run with `npm run build`, every time we want to rebuild the site, by adding the following script to our _package.json_ `scripts` block:

"build": "node ./scripts/build"

This is the complete generator:   
(Below I explain each part of the code.)

### Dependencies

For this basic feature set we only need three dependencies:

*   [**ejs**](http://ejs.co/)  
    Compile our templates to HTML.
*   [**fs-extra**](https://www.npmjs.com/package/fs-extra)  
    Adds new functions to Node’s native file-system module ([**fs**](https://nodejs.org/api/fs.html)) and add promise support for the existing ones.
*   [**glob**](https://www.npmjs.com/package/glob)  
    Recursively read a directory, returning an array with all files that match an specified pattern.

### Promisify all the things!

One thing to note in our code is that we use Node’s [_util.promisify_](https://nodejs.org/api/util.html#util_util_promisify_original) function to convert all callback-based functions to promise-based. It makes our code shorter, cleaner and easier to read.

**const** { promisify } = **require**('util')  
**const** ejsRenderFile = promisify(**require**('ejs').renderFile)  
**const** globP = promisify(**require**('glob'))

### Load the config

At the top we load the site config file, to later inject it in the templates rendering.

**const** config = **require**('../site.config')

The site config file itself load the additional JSON data, for example:

**const** projects = **require**('./src/data/projects')

**module.exports** = {  
  site: {  
    title: 'NanoGen',  
    description: 'Micro Static Site Generator in Node.js',  
    projects  
  }  
}

### Empty the public folder

We use _emptyDirSync_ from **fs-extra** to empty the public folder.

fse.emptyDirSync(distPath)

### Copy assets

Here we use the _copy_ method from **fs-extra**, that recursively copy a folder with contents.

fse.copy(\`${srcPath}/assets\`, \`${distPath}/assets\`)

### Compile the pages templates

First we use **glob** (our _promisified_ version) to recursively read the _src/pages_ folder looking for .ejs files. It will return an array with the paths of found files.

globP('\*\*/\*.ejs', { cwd: \`${srcPath}/pages\` })  
  .**then**((files) => {

For each template file found we use the Node’s [**path**](https://nodejs.org/api/path.html).parse function to separate the components of the file path (like dir, name and extension). Then we create a corresponding folder in the public directory with **fs-extra** _mkdirs_.

files.**forEach**((file) => {  
  **const** fileData = path.parse(file)  
  **const** destPath = path.join(distPath, fileData.dir)

 _// create destination directory_  
  fse.mkdirs(destPath)

We then use **EJS** to compile the file, passing the config data. Since we are using a _promisified_ version of _ejs.renderFile_, we can return the call and handle the result in the next promise chain.

.**then**(() => {  
  _// render page_  
  **return** ejsRenderFile(\`${srcPath}/pages/${file}\`, **Object**.assign({}, config))  
})

In the next _then_ block we have the compiled page template. Now we compile the layout file, passing the page contents as a `body` attribute.

.**then**((pageContents) => {  
  _// render layout with page contents_  
  **return** ejsRenderFile(\`${srcPath}/layout.ejs\`, **Object**.assign({}, config, { body: pageContents }))  
})

Finally we take the resulting compiled string (HTML of layout + page contents) and save to an HTML file, with the same path and name of the template.

.**then**((layoutContent) => {  
  _// save the html file_  
  fse.writeFile(\`${destPath}/${fileData.name}.html\`, layoutContent)  
})

## Development server

To make it easier to view the results, we add a simple development server, like the [serve](https://www.npmjs.com/package/serve) module and the the following to our _package.json_ `scripts` block:

"serve": "serve ./public"

Then run `npm run serve` and go to [http://localhost:5000](http://localhost:5000)

### Result

The complete example at this stage can be found here: [https://github.com/doug2k1/nanogen/tree/legacy](https://github.com/doug2k1/nanogen/tree/legacy)

**_Edit:_** _after some time I decided to turn the project into a CLI module, to make it easier to use, which is in the_ `_master_` _branch of the repository. The original code created at the end of this post is in the_ `_legacy_` _branch (link above)._

## Bonus Feature 1: Markdown and front matter

Most static site generators allow writing content in [Markdown](https://en.wikipedia.org/wiki/Markdown) format. Also, most of them allow adding some metadata on top of each page (aka **front matter**) in the [YAML](http://yaml.org/) format, like this:

\---  
title: Hello World  
date: 2013/7/13 20:46:25  
\---

With a few changes we could add the same features to our micro generator.

### New dependencies

We must add two more dependencies:

*   [**marked**](https://www.npmjs.com/package/marked)  
    Compile Markdown to HTML.
*   [**front-matter**](https://www.npmjs.com/package/front-matter)  
    Extract meta data (front matter) from documents.

### Include the new file types

We change the **glob** pattern to include .md files. We leave .ejs, to allow for more complex pages that could not be possible with Markdown, and we also include .html, in case we want to include some pure HTML pages.

globP('\*\*/\*.@(md|ejs|html)', { cwd: \`${srcPath}/pages\` })

### Extract front matter

Then, for each file path we have to actually load the file contents, so **front-matter** can extract the meta data at the top.

.**then**(() => {  
  _// read page file_  
  **return** fse.readFile(\`${srcPath}/pages/${file}\`, 'utf-8')  
})

We pass the loaded contents to **front-matter**. It will return and object with the meta data in the `attributes` property and the rest of the content in the `body` property. We then augment the site config with this data.

.**then**((data) => {  
  _// extract front matter_  
  **const** pageData = frontMatter(data)  
  **const** templateConfig = **Object**.assign({}, config, { page: pageData.attributes })

### Compile files to HTML

Now we compile the page content to HTML depending on the file extension. If is .md, we send to **marked**, if .ejs we continue to use **EJS**, else (is .html) there is no need to compile.

**let** pageContent  

**switch** (fileData.ext) {  
  **case** '.md':  
    pageContent = marked(pageData.body)  
    **break**  
  **case** '.ejs':  
    pageContent = ejs.render(pageData.body, templateConfig)  
    **break**  
  **default**:  
    pageContent = pageData.body  
}

Finally, we render the layout, as before, sending the compiled page contents as `body`.

One nice thing with front matter is that now we can set individual titles for each page, like this:

\---  
title: Another Page  
\---

And have the layout dynamically render them like this:

**<title>**<%= page.title ? \`${page.title} | \` : '' %><%= site.title %>**</title>**

Each page will have a unique `<title>` tag.

## Bonus Feature 2: Multiple layouts

Another interesting feature is the ability to use a different layout in specific pages. Since our pages now can have front matter, we may use it to set a different layout than the default:

\---  
layout: minimal  
\---

### Separate the layout files

We need to have separate layout files. I’ve put them in the _src/layouts_ folder:

src/layouts/  
  default.ejs  
  mininal.ejs

### Render the correct layout

If the front matter `layout` attribute is present, we render the layout file with the same name in the _layouts_ folder. If it is not set, we render the _default_.

**const** layout = pageData.attributes.layout **||** 'default'

**return** ejsRenderFile(\`${srcPath}/layouts/${layout}.ejs\`, Object.assign({}, templateConfig, { body: pageContent }))

### Result

The complete code, with the extra features, can be found here: [https://github.com/doug2k1/nanogen](https://github.com/doug2k1/nanogen/tree/v1)

Even with the added features, the build script has about 60 lines. 😉

## Next Steps

If you want to go even further, some additional features that shouldn’t be difficult to add:

*   **Dev server with live reloading**  
    You may use modules like [**live-server**](https://www.npmjs.com/package/live-server) (has auto reload built in) and [**chokidar**](https://www.npmjs.com/package/chokidar) (watch for file modifications to automatically trigger the build script).
*   **Automatic deploys**  
    Add scripts to deploy the site to common hosting services like [**GitHub Pages**](https://pages.github.com/), or simply copy the files to your own server via SSH (with commands like [scp](http://www.hypexr.org/linux_scp_help.php) or [rsync](https://rsync.samba.org/))
*   **Support for CSS/JS preprocessors**  
    Add some preprocessing to your assets files (SASS to CSS, ES6 to ES5, etc) before copying to the public folder.
*   **Better console output**  
    Add some `console.log` calls to better indicate what is going on. You could use a module like [**chalk**](https://www.npmjs.com/package/chalk)  to make it even prettier.

Feedback? Suggestions? Feel free to comment or contact me!

## Course Recommendation

[**The Complete Node.js Developer Course (2nd Edition)**  
_Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!_click.linksynergy.com](https://click.linksynergy.com/deeplink?id=2tWLz9iuLxQ&mid=39197&murl=https%3A%2F%2Fwww.udemy.com%2Fthe-complete-nodejs-developer-course-2%2F "https://click.linksynergy.com/deeplink?id=2tWLz9iuLxQ&mid=39197&murl=https%3A%2F%2Fwww.udemy.com%2Fthe-complete-nodejs-developer-course-2%2F")[](https://click.linksynergy.com/deeplink?id=2tWLz9iuLxQ&mid=39197&murl=https%3A%2F%2Fwww.udemy.com%2Fthe-complete-nodejs-developer-course-2%2F)