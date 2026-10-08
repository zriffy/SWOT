import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useCompetitors() {
  return useQuery({
    queryKey: [api.competitors.list.path],
    queryFn: async () => {
      const res = await fetch(api.competitors.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch competitors");
      return api.competitors.list.responses[200].parse(await res.json());
    },
  });
}

export function useComparisonTable() {
  return useQuery({
    queryKey: [api.comparisonTable.list.path],
    queryFn: async () => {
      const res = await fetch(api.comparisonTable.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch comparison table");
      return api.comparisonTable.list.responses[200].parse(await res.json());
    },
  });
}

export function useStrategies() {
  return useQuery({
    queryKey: [api.strategies.list.path],
    queryFn: async () => {
      const res = await fetch(api.strategies.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch strategies");
      return api.strategies.list.responses[200].parse(await res.json());
    },
  });
}

export function useSwot() {
  return useQuery({
    queryKey: [api.swot.list.path],
    queryFn: async () => {
      const res = await fetch(api.swot.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch SWOT analysis");
      return api.swot.list.responses[200].parse(await res.json());
    },
  });
}

export function useMarketInsights() {
  return useQuery({
    queryKey: [api.marketInsights.list.path],
    queryFn: async () => {
      const res = await fetch(api.marketInsights.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch market insights");
      return api.marketInsights.list.responses[200].parse(await res.json());
    },
  });
}
