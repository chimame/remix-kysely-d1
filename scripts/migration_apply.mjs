const packages = await glob(['prisma/migrations/*/migration.sql'])

await $`mkdir -p ./.wrangler/migrations`

for (let i =0; i < packages.length; i++) {
  const migrationName = packages[i].replace('prisma/migrations/', '').split('/')[0]
  await $`cp ${packages[i]} .wrangler/migrations/${migrationName}.sql`
}

await $`npx wrangler d1 migrations apply kysely-sample`
