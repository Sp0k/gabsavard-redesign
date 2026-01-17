/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type JwtClaims = {
  sub: string;
  email?: string;
  role?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
};

declare namespace App {
  interface Locals {
    claims: JwtClaims;
  }
}

