# Detect changes between two branches

A Github action to detect if source branch is ahead of target branch.

### Action inputs

| Name          | Description           | Default   | Required |
|---------------|-----------------------|-----------|----------|
| repo-token    | `GITHUB_TOKEN`        |           | true     |
| soruce-branch | Name of source branch |           | true    |
| target-branch | Name of target branch |           | true    |

### Action outputs

The following outputs can be used by subsequent workflow steps.

- `is-source-branch-ahead` - Check if source branch is ahead of target branch.
