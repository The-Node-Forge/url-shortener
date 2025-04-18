"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5624],{5190:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"USAGE","title":"Usage","description":"Basic example and config.","source":"@site/docs/USAGE.md","sourceDirName":".","slug":"/USAGE","permalink":"/url-shortener/docs/USAGE","draft":false,"unlisted":false,"editUrl":"https://github.com/The-Node-Forge/url-shortener/tree/main/docs/docs/USAGE.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"title":"Usage","description":"Basic example and config.","sidebar_position":3},"sidebar":"tutorialSidebar","previous":{"title":"Installation","permalink":"/url-shortener/docs/INSTALLATION"},"next":{"title":"API Reference","permalink":"/url-shortener/docs/API_REFERENCE"}}');var t=s(4848),o=s(8453);const i={title:"Usage",description:"Basic example and config.",sidebar_position:3},a=void 0,c={},l=[{value:"Basic Usage (TypeScript / Node.js)",id:"basic-usage-typescript--nodejs",level:3},{value:"Configuration Options",id:"configuration-options",level:3},{value:"Using with Express",id:"using-with-express",level:3},{value:"Redis Setup",id:"redis-setup",level:3}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",h3:"h3",hr:"hr",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h3,{id:"basic-usage-typescript--nodejs",children:"Basic Usage (TypeScript / Node.js)"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { createClient } from 'redis';\nimport { RedisStore } from '@the-node-forge/url-shortener/stores/redisStore';\nimport { URLShortener } from '@the-node-forge/url-shortener';\n\nconst client = createClient();\nawait client.connect();\n\nconst store = new RedisStore(client);\nconst shortener = new URLShortener('https://sho.rt', store);\n\nconst shortUrl = await shortener.shorten('https://example.com/some/long/url');\nconsole.log(shortUrl); // Output: https://sho.rt/abc123\n\nconst resolved = await shortener.resolve(shortUrl.split('/').pop()!);\nconsole.log(resolved); // Output: https://example.com/some/long/url\n"})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"configuration-options",children:"Configuration Options"}),"\n",(0,t.jsxs)(n.p,{children:["You can pass an ",(0,t.jsx)(n.code,{children:"options"})," object to configure aliasing, expiration, and override\nbehavior:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const shortUrl = await shortener.shorten('https://example.com', {\n  alias: 'custom-alias',\n  expiresIn: '7d',\n  override: true,\n});\n"})}),"\n",(0,t.jsx)(n.p,{children:"Example config:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{\n  "alias": "custom-alias",\n  "expiresIn": "7d",\n  "override": true\n}\n'})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"using-with-express",children:"Using with Express"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import express from 'express';\nimport { createClient } from 'redis';\nimport { RedisStore } from '@the-node-forge/url-shortener/stores/redisStore';\nimport { URLShortener } from '@the-node-forge/url-shortener';\n\nconst app = express();\napp.use(express.json());\n\nconst client = createClient();\nawait client.connect();\n\nconst shortener = new URLShortener('https://sho.rt', new RedisStore(client));\n\napp.post('/shorten', async (req, res) => {\n  try {\n    const shortUrl = await shortener.shorten(req.body.url, req.body.options);\n    res.json({ shortUrl });\n  } catch (err) {\n    res.status(500).json({ error: err.message });\n  }\n});\n\napp.get('/resolve/:alias', async (req, res) => {\n  const resolvedUrl = await shortener.resolve(req.params.alias);\n  if (resolvedUrl) {\n    res.redirect(resolvedUrl);\n  } else {\n    res.status(404).send('Not found or expired');\n  }\n});\n"})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h3,{id:"redis-setup",children:"Redis Setup"}),"\n",(0,t.jsx)(n.p,{children:"This package uses Redis as the required backend store. Make sure Redis is running and\nyour app is connected."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { createClient } from 'redis';\nimport { RedisStore } from '@the-node-forge/url-shortener/stores/redisStore';\n\nconst client = createClient();\nawait client.connect();\n\nconst store = new RedisStore(client);\n"})}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:"Make sure to run:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm install redis\n"})}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsxs)(n.p,{children:["For full method descriptions and customization options, see\n",(0,t.jsx)(n.a,{href:"/url-shortener/docs/API_REFERENCE",children:"API_REFERENCE.md"}),"."]})]})}function p(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>a});var r=s(6540);const t={},o=r.createContext(t);function i(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);