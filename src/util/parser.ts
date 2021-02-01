/**
 * @fileoverview Command line utility.
 * See: https://github.com/AssemblyScript/assemblyscript/blob/master/cli/util/options.js
 * @copyright AssemblyScript
 * @license Apache-2.0
 */

import colors from "ansi-colors";

// type | meaning
// -----|---------------
// b    | boolean
// i    | integer
// f    | float
// s    | string
// I    | integer array
// F    | float array
// S    | string array

export interface OptionDescription {
  /** Textual description. */
  description?: string | string[];
  /** Data type. One of (b)oolean [default], (i)nteger, (f)loat or (s)tring. Uppercase means multiple values. */
  type?: "b" | "i" | "f" | "s" | "I" | "F" | "S";
  /** Substituted options, if any. */
  value?: { [key: string]: number | string };
  /** Short alias, if any. */
  alias?: string | string[];
  /** Category for this option. */
  category?: string;
  /** A default value. */
  default?: any;
}

/** Configuration object. */
export interface Config {
  [key: string]: OptionDescription;
}

export interface ResultOptions {
  [key: string]: number | string | number[] | string[] | boolean;
}

/** Parsing result. */
export interface Result {
  /** Parsed options. */
  options: ResultOptions;
  /** Unknown options. */
  unknown: string[];
  /** Normal arguments. */
  args: string[];
  /** Trailing arguments. */
  trailing: string[];
}

/** Help formatting options. */
export interface HelpOptions {
  /** Leading indent. Defaults to 2. */
  indent: number;
  /** Table padding. Defaults to 24. */
  padding: number;
  /** End of line character. Defaults to "\n". */
  eol: string;
  /** Specify if no categories should be shown. */
  noCategories: boolean;
}

interface AliasMap {
  [alias: string]: string;
}

/** Parses the specified command line arguments according to the given configuration. */
export function parse(argv: string[], config: Config): Result {
  var options: ResultOptions = {};
  var unknown: string[] = [];
  var args: string[] = [];
  var trailing: string[] = [];

  // make an alias map and initialize defaults
  var aliases: AliasMap = {};
  Object.keys(config).forEach((key) => {
    if (key.startsWith(" ")) return;
    var option = config[key];
    if (option.alias != null) {
      if (typeof option.alias === "string") aliases[option.alias] = key;
      else if (Array.isArray(option.alias))
        option.alias.forEach((alias) => (aliases[alias] = key));
    }
    if (option.default != null) options[key] = option.default;
  });

  // iterate over argv
  for (var i = 0, k = (argv = argv.slice()).length; i < k; ++i) {
    let arg = argv[i];
    if (arg == "--") {
      ++i;
      break;
    }
    let match = /^(?:(\-\w)(?:=(.*))?|(\-\-\w{2,})(?:=(.*))?)$/.exec(arg),
      option: OptionDescription | null = null,
      key: string;
    if (match) {
      key = arg;
      if (config[arg]) option = config[arg];
      // exact
      else if (match[1] != null) {
        // alias
        option = config[(key = aliases[match[1].substring(1)])];
        if (option && match[2] != null) argv[i--] = match[2];
      } else if (match[3] != null) {
        // full
        option = config[(key = match[3].substring(2))];
        if (option && match[4] != null) argv[i--] = match[4];
      }
    } else {
      key = arg;
      if (arg.charCodeAt(0) == 45) option = config[arg];
      // exact
      else {
        args.push(arg);
        continue;
      } // argument
    }
    if (option) {
      if (option.type == null || option.type === "b") options[key] = true;
      // flag
      else {
        if (i + 1 < argv.length && argv[i + 1].charCodeAt(0) != 45) {
          // present
          switch (option.type) {
            case "i":
              options[key] = parseInt(argv[++i], 10);
              break;
            case "I":
              options[key] = ((options[key] as number[]) || []).concat(
                parseInt(argv[++i], 10),
              );
              break;
            case "f":
              options[key] = parseFloat(argv[++i]);
              break;
            case "F":
              options[key] = ((options[key] as number[]) || []).concat(
                parseFloat(argv[++i]),
              );
              break;
            case "s":
              options[key] = String(argv[++i]);
              break;
            case "S":
              options[key] = ((options[key] as string[]) || []).concat(
                argv[++i].split(","),
              );
              break;
            default:
              unknown.push(arg);
              --i;
          }
        } else {
          // omitted
          switch (option.type) {
            case "i":
            case "f":
              options[key] = option.default || 0;
              break;
            case "s":
              options[key] = option.default || "";
              break;
            case "I":
            case "F":
            case "S":
              options[key] = option.default || [];
              break;
            default:
              unknown.push(arg);
          }
        }
      }
      const value = option.value;
      if (value) Object.keys(value).forEach((k) => (options[k] = value[k]));
    } else unknown.push(arg);
  }
  while (i < k) trailing.push(argv[i++]); // trailing

  return { options, unknown, args, trailing };
}

/** Generates the help text for the specified configuration. */
export function help(
  config: Config,
  options: Partial<HelpOptions> = {},
): string {
  var indent = options.indent || 2;
  var padding = options.padding || 24;
  var eol = options.eol || "\n";
  var sbCategories: { [key: string]: string[] } = {};
  var sbOther: string[] = [];
  Object.keys(config).forEach((key) => {
    var option = config[key];
    if (option.description == null) return;
    var text = "";
    while (text.length < indent) text += " ";
    text += "--" + key;
    if (option.alias) text += ", -" + option.alias;
    while (text.length < padding) text += " ";
    var sb: string[];
    if (!options.noCategories && option.category) {
      sb = sbCategories[option.category];
      if (!sb) {
        sbCategories[option.category] = sb = [];
      }
    } else {
      sb = sbOther;
    }
    if (Array.isArray(option.description)) {
      sb.push(
        text +
          option.description[0] +
          option.description
            .slice(1)
            .map((line) => {
              for (let i = 0; i < padding; ++i) line = " " + line;
              return eol + line;
            })
            .join(""),
      );
    } else sb.push(text + option.description);
  });
  var sb: string[] = [];
  var hasCategories: boolean = false;
  Object.keys(sbCategories).forEach((category) => {
    hasCategories = true;
    sb.push(eol + " " + colors.gray(category) + eol);
    sb.push(sbCategories[category].join(eol));
  });
  if (hasCategories) {
    sb.push(eol + " " + colors.gray("Other") + eol);
  }
  sb.push(sbOther.join(eol));
  return sb.join(eol);
}
