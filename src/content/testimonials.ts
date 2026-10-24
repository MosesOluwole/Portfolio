/**
 * Add real testimonials only, with the client's permission.
 * While this array is empty, the testimonials section is not rendered.
 *
 * Example:
 * { quote: "…", name: "Jane Smith", role: "Director", company: "Example Ltd" }
 */
export type Testimonial = { quote: string; name: string; role?: string; company?: string };

export const testimonials: Testimonial[] = [];
