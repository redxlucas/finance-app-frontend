"use client";

import * as React from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

import { useDashboardData } from "@/hooks/useDashboardData";
import { useTranslation } from "react-i18next";

export function ChartAreaInteractive() {
    const { data, loading, error } = useDashboardData();
    const { t } = useTranslation();
    const lang = localStorage.getItem("i18nextLng") || "pt";
    const locale = lang.startsWith("en") ? "en-US" : "pt-BR";

    const chartConfig = React.useMemo(
        () => ({
            expense: {
                label: t("dashboard.chart.line.expense"),
                color: "var(--primary)",
            },
            income: {
                label: t("dashboard.chart.line.income"),
                color: "var(--primary)",
            },
            net: {
                label: t("dashboard.chart.line.net"),
                color: "var(--primary)",
            },
        }),
        [t]
    );

    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("net");

    const chartData = React.useMemo(() => {
        return (
            data?.chart?.map((item) => ({
                ...item,
                income: item.income ?? 0,
                expense: item.expense ?? 0,
                net: item.total ?? 0,
            })) ?? []
        );
    }, [data]);

    const total = React.useMemo(() => {
        return {
            expense: chartData.reduce((acc, item) => acc + item.expense, 0),
            income: chartData.reduce((acc, item) => acc + item.income, 0),
            net: chartData.at(-1)?.total ?? 0,
        };
    }, [chartData]);

    if (loading) {
        return (
            <div className="p-4">
                {t("dashboard.chart.line.dataUnavailable")}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                {t("dashboard.chart.line.loadFailed")}
            </div>
        );
    }

    return (
        <Card className="py-4 sm:py-0">
            <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
                    <CardTitle>{t("dashboard.chart.line.title")}</CardTitle>
                    <CardDescription className="font-light">
                        {t("dashboard.chart.line.description", {
                            label: chartConfig[activeChart].label.toLowerCase(),
                            month:
                                chartData.length > 0
                                    ? new Date(
                                          chartData.at(-1)!.date + "T00:00:00"
                                      ).toLocaleDateString("pt-BR", {
                                          month: "long",
                                      })
                                    : "",
                        })}
                    </CardDescription>
                </div>
                <div className="flex">
                    {(["net", "expense", "income"] as const).map((key) => {
                        const chart = key as keyof typeof chartConfig;
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-foreground text-sm font-light">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-sm text-primary leading-none font-bold sm:text-xl">
                                    R${" "}
                                    {total[chart].toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                    })}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="w-full h-[250px]"
                >
                    {/* <ResponsiveContainer width="100%" height="100%"> */}
                    <LineChart
                        data={chartData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value + "T00:00:00");
                                return date.toLocaleDateString(locale, {
                                    month: "short",
                                    year: "numeric",
                                    day: "2-digit",
                                });
                            }}
                        />

                        <YAxis hide />

                        <Tooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey={activeChart}
                                    labelFormatter={(value) =>
                                        new Date(
                                            value + "T00:00:00"
                                        ).toLocaleDateString(locale, {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                    }
                                />
                            }
                        />

                        <Line
                            dataKey={activeChart}
                            type="monotone"
                            stroke={chartConfig[activeChart].color}
                            strokeWidth={2}
                            dot={true}
                            isAnimationActive={true}
                        />
                    </LineChart>
                    {/* </ResponsiveContainer> */}
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
