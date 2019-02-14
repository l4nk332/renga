import { Q } from '../../quilt.js'

const css = (
  Q.style(Q._, `
    :root {
      box-sizing: border-box;
    }

    html, body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                   Helvetica, Arial, sans-serif, "Apple Color Emoji",
                   "Segoe UI Emoji", "Segoe UI Symbol";
    }

    header h1 {
      margin: 0;
    }

    ul {
      padding: 0;
      list-style: none;
    }

    .container {
      display: grid;
      grid-template-areas: 'header header header header header'
                           'aside content content content content'
                           'footer footer footer footer footer';
      grid-template-rows: 50px 1fr 30px;
      width: 100%;
      height: 100vh;
    }

    .header {
      grid-area: header;
      background: dodgerblue;
    }

    .aside {
      grid-area: aside;
      background: indianred;
    }

    .content {
      grid-area: content;
      background: snow;
    }

    .footer {
      grid-area: footer;
      background: mediumseagreen;
    }

    .muted {
      color: #ddd;
    }
  `)
)

const app = (
  Q.main({id: 'app', class: 'container', dataInvoiceId: 2, valid: true}, [
    Q.header({class: 'header'},
      Q.h1(Q._, 'Page Title')
    ),
    Q.aside({class: 'aside'},
      Q.ul(Q._, [
        Q.li(Q._, 'Link A'),
        Q.li(Q._, 'Link B'),
        Q.li(Q._, 'Link C'),
        Q.li(Q._, 'Link D'),
        Q.li(Q._, 'Link E')
      ])
    ),
    Q.section({class: 'content'}, [
      Q.figure(Q._, 'Figure A'),
      Q.figure(Q._, 'Figure B'),
      Q.figure(Q._, 'Figure C')
    ]),
    Q.footer({class: 'footer'}, [
      'Created by ', Q.small({class: 'muted'}, 'Ian Jabour'), '.'
    ])
  ])
)

document.body.appendChild(css)
document.body.appendChild(app)
