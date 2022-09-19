import { SetMetadata } from "@nestjs/common";

/**
 * decorator to set public access resources (signup, signin)
 * @returns 
 */
export const Public = () => SetMetadata('isPublic', true);