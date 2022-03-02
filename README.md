<h1>Storybook Docs 2.0 Prototype</h1>

This repo illustrates a few ideas we're evaluating for Storybook Docs 2.0.

<img src="./screenshot.png" />

The prototype is a server-rendered documentation site based on Nextra/NextJS with embedded [Component Story Format (CSF)](https://storybook.js.org/docs/react/api/csf) stories.

Read on to learn more:

- [Why are we doing this?](#why-are-we-doing-this)
- [Key features](#key-features)
  - [Reuse stories outside of Storybook](#reuse-stories-outside-of-storybook)
  - [Reuse MDX docs outside of storybook](#reuse-mdx-docs-outside-of-storybook)
  - [A dramatically simpler Storybook](#a-dramatically-simpler-storybook)
- [Next steps](#next-steps)
- [Running the example](#running-the-example)
- [Feedback](#feedback)

## Why are we doing this?

Imagine an individual or team building out a design system or application in a series of stages.

**1. Bootstrap.** As the team starts its journey, they focus on building and testing their components. Storybook helps them get off the ground quickly, giving best-practice auto-generated documentation "for free" using [DocsPage](https://storybook.js.org/docs/react/writing-docs/docs-page).

**2. Develop.** When they need more flexibility than DocsPage provides and/or they start writing longform documentation, they mix in [MDX and Doc Blocks](https://storybook.js.org/docs/react/api/mdx).

**3. Market**. Eventually, they may need more flexibility than Storybook provides. For example, they want to release their documentation publicly in a fully custom, branded documentation system based on the technology of their choice.

Storybook Docs 1.0 already supports DocsPage and MDX, the ability to reuse stories and docs in other documentation tools is completely new. We see the need most strongly at bigger companies, who have more resources to devote to external-facing documentation, and where the choice of documentation system may have already been made in another part of the company.

## Key features

The purpose of this prototype is to demonstrate the ability to:

- Reuse CSF stories outside of Storybook
- Reuse MDX documentation outside of Storybook

We also touch on other benefits this approach brings to Storybook users.

### Reuse stories outside of Storybook

In Docs 2.0, you can reuse stories outside of Storybook.

Storybook Docs makes it easy for developers to document components as they build. However, many teams have other requirements, such as more customized branding, integration with existing documentation systems, easier authoring for non-technical teammates and so-forth.

Docs 2.0 will make it easy to document components both inside AND outside of Storybook depending on your needs.

This example is Nextra/NextJS, but it could just as easily be Docusaurus, Gatsby, or your CMS of choice. The current constraint is that Storybook's Doc Blocks are React components, and utilize React Context (introduced in React 16.8).

The programming model is that you wrap a page in a `DocsContainer` wrapper, and then you can use any of the doc blocks (`Story`, `Canvas`, `Source`, `Description`, and so on). The Doc Blocks access the `DocsContext` which is an API for interacting with Storybook embedded in your application.

Here's what that looks like:

```jsx
import { DocsContainer, Story } from '@storybook/blocks';
import meta, { Standard } from '../components/AccountForm.stories';

export default () => (
  <DocsContainer>
    <Story of={Standard} meta={meta} />
  </DocsContainer>
);
```

### Reuse MDX docs outside of storybook

In Docs 2.0, you can also reuse your MDX documentation outside of Storybook.

In Storybook Docs 1.0, the MDX implementation was tied to Storybook's runtime. When you defined stories in Docs 1.0 MDX, you needed a special webpack loader to process the files. And the Docs rendering was tightly coupled to Storybook's runtime.

In Docs 2.0, we're redesigning it so that you're using standard MDX that's supported by many modern CMS's like NextJS, Gatsby, and Docusaurus. This way you can build your docs out in Storybook, reuse them in an external documentation system.

The key change is that you no longer define stories in MDX. Instead, you define them in [Component Story Format (CSF)](https://storybook.js.org/docs/react/api/csf), and reference them from MDX. Here's what that looks like in code:

```js
import { Meta, Story, Canvas } from '@storybook/blocks';
import meta, { Standard } from '../components/AccountForm.stories';

<Meta of={meta} />

<Canvas>
  <Story of={Standard} />
</Canvas>
```

There's a lot going on here. If you've used [MDX and Doc Blocks](https://storybook.js.org/docs/react/api/mdx) this should look pretty familiar. What's different is that you're importing the default export as `meta` and defining it for the whole file with a `Meta` block. Then for each story, you're rendering it using the `Story` block.

### A dramatically simpler Storybook

This approach will dramatically simplify Storybook.

First, by giving users an "escape hatch" to reuse their content outside of Storybook, we can simplify Storybook from a feature standpoint.

- Is sophisticated theming really important to you? Use Gatsby.
- Is internationalization crucial? Use Docusaurus.
- Is performance critical? Use NextJS.

Storybook will continue to evolve as the best place to build, test, and document components. But we don't need to be the best at everything, since as a user you can optimize your documentation to your needs.

Second, by eliminating story definition from MDX, this allows us to double down on CSF.

A single story format will dramatically simplify Storybook implementation, maintenance, and documentation, which will benefit users and maintainers alike. It also benefits other aspects of the toolchain, such as interaction testing and third-party tool integrations.

## Next steps

This prototype is missing many key pieces.

Firstly, it doesn't use Storybook's runtime for Args, Controls, and so forth. We will build this out in the coming weeks and months.

After we have a working demo, we will also rewrite Storybook docs to use the new blocks. This way, the code that's running in Storybook will be nearly identical to the code that's running in your custom docs site.

Finally, there are other aspects to Docs 2.0 that are not described here, including but not limited to, an updated UI and updated runtime data structure.

## Running the example

Before you run the example, some **important disclaimers**:

1. This one of several ideas we're considering for Docs 2.0
2. This is throwaway code that's for feedback only.
3. It's not intended to be consumed or built upon.

To run the example:

```sh
yarn && yarn dev
```

The source is visible in:

- Portable docs: [index.mdx](./pages/index.mdx)
- Standard CSF: [AccountForm.stories.tsx](./components/AccountForm.stories.tsx)
- Setup code: [\_app.js](./pages/_app.js)

## Feedback

We're interested to hear your feedback on this direction for Storybook Docs. If you have questions or ideas, please reach out directly to Michael Shilman (`@mshilman` on Twitter), or chat in the `#addon-docs` channel in the Storybook Discord https://discord.gg/storybook.
