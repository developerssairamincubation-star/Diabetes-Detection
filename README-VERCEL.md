# Deploying RetinAI Healthcare to Vercel

This guide explains how to deploy the RetinAI Healthcare application to Vercel for free.

## Prerequisites

- A [Vercel](https://vercel.com) account (you can sign up for free)
- A [GitHub](https://github.com) account (you can sign up for free)

## Deployment Steps

1. Push your code to a GitHub repository
2. Connect your Vercel account to your GitHub account
3. Import your repository to Vercel
4. Configure the environment variables
5. Deploy the application

## Environment Variables

Make sure to set the following environment variable in your Vercel project settings:

- `NEXT_PUBLIC_API_URL`: https://harishvijayasarangan-dr-server.hf.space (or your custom FastAPI backend URL)

## Connecting to the FastAPI Backend

The application is already configured to use the FastAPI backend hosted on Hugging Face. The `vercel.json` file includes rewrites to route API requests to the backend.

## Automatic Deployments

Once set up, Vercel will automatically deploy your application whenever you push changes to your GitHub repository.
