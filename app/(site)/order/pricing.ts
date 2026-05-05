import { STATE_FEES, packagePrices } from "./data";

export type OrderPackage = "Basic" | "Standard" | "Premium";

function parseNumberParam(value: string | null) {
  if (!value) return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function resolveSelectedPricing(
  params: Pick<URLSearchParams, "get">,
  state: string,
  pkg: OrderPackage,
) {
  const packagePrice = parseNumberParam(params.get("packagePrice")) ?? packagePrices[pkg] ?? 0;
  const stateFee = parseNumberParam(params.get("stateFee")) ?? STATE_FEES[state] ?? 50;

  return {
    packagePrice,
    stateFee,
  };
}

export function buildPricingParams(packagePrice: number, stateFee: number) {
  return {
    packagePrice: String(packagePrice),
    stateFee: String(stateFee),
  };
}