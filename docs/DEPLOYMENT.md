# Deploying the onboarding Hub

The hosted onboarding and the learner exercise are deliberately separate Chromatic projects.

| Project               | Purpose                                                  | Who configures it             |
| --------------------- | -------------------------------------------------------- | ----------------------------- |
| Onboarding Hub        | A durable, read-only course and facilitator reference    | The course owner, once        |
| React learner project | Branch builds, baselines, visual review, and CI practice | Each learner during Days 8–10 |

Publishing the Hub does not complete the React exercise. It gives an SE somewhere to read the course
before cloning the repository, while the learner still has to install the CLI, handle the token,
publish the correct package, understand Git ancestry, and build the CI workflow.

## One-time deployment

1. Push this repository to GitHub with `main` as its default branch.
2. In Chromatic, create a project for the repository's **onboarding Hub**. Keep it separate from the
   shared React project used during the course.
3. Add its project token to GitHub Actions as the repository secret
   `CHROMATIC_HUB_PROJECT_TOKEN`. The workflow maps that secret to the CLI's expected
   `CHROMATIC_PROJECT_TOKEN` environment variable; the token never belongs in source.
4. Run the **Publish onboarding Hub** workflow, or push a commit to `main`.
5. Open the resulting Storybook, confirm the Welcome and Setup pages work, and share that Storybook
   URL with the cohort.

The workflow publishes with `--exit-once-uploaded` because this project is a course host, not the
visual-testing exercise. The separate React project keeps normal Chromatic test and review behavior.

## Hosted composition

Local development composes all five framework Storybooks from ports 6007–6011. A hosted Hub cannot
reach those local URLs, so its Chromatic build omits the framework references unless real hosted URLs
are supplied.

To add hosted composition later, publish each framework Storybook independently and define these
variables while building the Hub:

```sh
STORYBOOK_REACT_URL=https://... \
STORYBOOK_NEXTJS_URL=https://... \
STORYBOOK_ANGULAR_URL=https://... \
STORYBOOK_WEB_COMPONENTS_URL=https://... \
STORYBOOK_REACT_NATIVE_WEB_URL=https://... \
pnpm deploy:hub
```

That is intentionally optional. The first hosted release should optimize for a dependable course,
while the local repository remains the complete composition lab.

## Release checks

Before sharing a new release:

```sh
pnpm check
pnpm test:onboarding:setup
```

The first command validates every workspace. The second clones `main` into a temporary directory,
follows the learner setup, starts all six Storybooks, and verifies that the Hub and React catalog are
reachable before cleaning up.
