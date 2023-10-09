# my-doc

Throw away old-ish UX Word-like documentation (*cough* Jira, Confluence, and friends *cough*).
Fork, clone, customize or wathever this project. Make Documentation Great again !

# The Idea, the Concept

Did you already experienced a nightmare documentation in your enterpise ? A Word-like document ? Infinitly long, poorly structured ? And Above all an unfriendly user experience ?

I wanted to bring a possible solution based on what I've used. My models were Angular Material, Bootstrap.
What it should have :
- a left menu
- a body displaying the documentation
- within the documentation, a menu to navigate inside the displayed documentation

On the technical point, it has been decided to use markdown and so a markdown library to parse and convert to HTML.
As we also want to display our components with their corresponding code, two technologies from Angular are used :
- [Angular elements](https://angular.io/guide/elements)
- [Dynamic component loader](https://angular.io/guide/dynamic-component-loader)

## Technology Key

[Angular elements](https://angular.io/guide/elements)
[Dynamic component loader](https://angular.io/guide/dynamic-component-loader)

# Customization

To Do

# How it works ?
A specific markdownd file is fetch according to the page we are landing on.
When it is fully fetch, it is given to [ngx-markdown](https://www.npmjs.com/package/ngx-markdown) to be convert into HTML. This process is enhanced to convert the below token to a playable component ([in details](#playable-component)).
```
<!--- example(MyComponentName) -->
```

## Playable Component

To Do

# To Improve

- Should rework the way we find and fetch files to display code from playable examples
  - For now we have a constant nammed "COMPONENT_MAP", possible to remove ?
  - "COMPONENT_MAP" is mandatory cause of how Angular handle "assets" in angular.json