"use client";

import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { Diagnostic } from "@/types/diagnostic";

interface DiagnosticCardProps {
  diagnostic: Diagnostic;
  diagnosticSelected: Diagnostic;
  index: number;
  handleSelect: (item: Diagnostic) => void;
}

const RecommendationCard = ({
  diagnostic,
  handleSelect,
  diagnosticSelected,
}: DiagnosticCardProps) => {

  return (
    <div
      className={`flex cursor-pointer ${
        diagnosticSelected?.id == diagnostic.id ? "bg-green-200" : ""
      } rounded-xl`}
      onClick={() => handleSelect(diagnostic)}
    >
      <Box maxWidth="350px" width={"350px"}>
        <Card>
          <Flex gap="3" align="center">
            <Box>
              <Text as="div" size="2" weight="bold">
                Consumo actual: <span className="line-through">{diagnostic.current_kwh}</span>kWh
              </Text>
              <Text as="div" size="2" weight="bold">
                Consumo optimizado: {diagnostic.optimized_kwh}kWh
              </Text>
              <Text as="div" size="2" weight="bold">
                Porcentaje de ahorro total:{" "}
                {Math.round(diagnostic.total_saving_percent * 100) / 100}%
              </Text>
              <Text as="div" size="2" color="gray">
                {diagnostic.create_date}
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>
    </div>
  );
};

export default RecommendationCard;
