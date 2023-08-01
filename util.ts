export function exhaustiveCheck(check: never, message: string = `Reached unexpected code block with value '${check}'.`) {
  throw new Error(message);
}

export function sanitizeIdent(str: string): string {
  const sanitized =
    // make sure we have a string
    (`${str ?? ''}`)
      // make everything is lower
      .toLowerCase()
      // replace any invalid characters with `-`
      .replace(/\W/g, '-')
      // collapse multiple `-`
      .replace(/-+/g, '-')
      // remove leading and trailing `-`
      .replace(/^-|-$/g, '');

  return sanitized;
}
