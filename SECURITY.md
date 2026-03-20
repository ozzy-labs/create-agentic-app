# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in `create-agentic-dev`, please report it responsibly.

**Do not open a public issue for security vulnerabilities.**

Instead, please use [GitHub's Private Vulnerability Reporting](https://github.com/ozzy-3/create-agentic-dev/security/advisories/new) to submit your report directly through the repository. This ensures your report is kept private until a fix is available.

### What to include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response timeline

- **Acknowledgment**: within 48 hours
- **Initial assessment**: within 1 week
- **Fix and disclosure**: coordinated with reporter

## Scope

This policy covers the `create-agentic-dev` CLI tool and its generated output.

### In scope

- Command injection or arbitrary code execution via CLI inputs
- Secrets or credentials leaked in generated project files
- Dependency vulnerabilities in the CLI itself
- Template injection leading to malicious generated code

### Out of scope

- Vulnerabilities in third-party tools installed by generated projects (report to upstream)
- Security of user's own code added after project generation

## Security Measures

This project employs the following security practices:

- **Gitleaks**: Secret detection in pre-commit hooks and CI
- **npm provenance**: Published with `--provenance` for supply chain verification
- **Renovate**: Automated dependency updates
- **Pin by hash**: GitHub Actions pinned by commit SHA, not tags
