import { boolean, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  emailAddress: varchar("email_address", { length: 100 }).notNull(),
  emailDomain: varchar("email_domain", { length: 50 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  createdById: integer("created_by_id").references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  content: text("content"),
  version: varchar("version", { length: 50 }).notNull(),
  uploadedById: integer("uploaded_by_id").references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const documentSets = pgTable("document_sets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  ownerType: varchar("owner_type", { length: 50 }).notNull(),
  ownerId: integer("owner_id").notNull(),
  createdByTeamId: integer("created_by_team_id").references(() => teams.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const documentSetsToDocuments = pgTable("document_sets_to_documents", {
  documentSetId: integer("document_set_id").references(() => documentSets.id),
  documentId: integer("document_id").references(() => documents.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const teamsToUsers = pgTable("teams_to_users", {
  teamId: integer("team_id").references(() => teams.id),
  userId: integer("user_id").references(() => users.id),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const teamsToDocumentSets = pgTable("teams_to_document_sets", {
  teamId: integer("team_id").references(() => teams.id),
  documentSetId: integer("document_set_id").references(() => documentSets.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

