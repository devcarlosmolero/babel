CREATE TABLE `blocks` (
	`id` text PRIMARY KEY NOT NULL,
	`templateId` text NOT NULL,
	`type` text NOT NULL,
	`content` text,
	`answer` text,
	`options` text,
	`hasLeadingSpace` integer DEFAULT 0,
	`hasTrailingSpace` integer DEFAULT 0,
	`createdAt` integer DEFAULT (strftime('%s', 'now')),
	`updatedAt` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`templateId`) REFERENCES `templates`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `block_id_idx` ON `blocks` (`id`);--> statement-breakpoint
CREATE INDEX `block_template_idx` ON `blocks` (`templateId`);--> statement-breakpoint
CREATE TABLE `templates` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`createdAt` integer DEFAULT (strftime('%s', 'now')),
	`updatedAt` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE INDEX `template_id_idx` ON `templates` (`id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text,
	`createdAt` integer DEFAULT (strftime('%s', 'now')),
	`updatedAt` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `users` (`id`);