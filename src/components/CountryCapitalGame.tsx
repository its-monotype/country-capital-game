import { useState } from 'react';
import { Button, ButtonProps, Text, View } from 'reshaped';
import { shuffle } from '../helpers';

type OptionState = 'default' | 'selected' | 'wrong';

interface Option {
  value: string;
  state: OptionState;
}

const optionStateButtonColorMap: Record<OptionState, ButtonProps['color']> = {
  default: 'neutral',
  selected: 'primary',
  wrong: 'critical',
};

export function CountryCapitalGame({ data }: { data: Record<string, string> }) {
  const [options, setOptions] = useState<Option[]>(
    shuffle(
      Object.entries(data)
        .flat()
        .map((value) => ({ value, state: 'default' })),
    ),
  );

  const selectedOption = options.find((option) => option.state === 'selected');

  function handleButtonClick(newOption: Option) {
    // If there is no selected option, select the new option
    // and clear the state of all other options
    if (selectedOption === undefined) {
      setOptions(
        options.map((option) =>
          option.value === newOption.value
            ? {
                ...option,
                state: 'selected',
              }
            : { ...option, state: 'default' },
        ),
      );
      return;
    }

    // If the new option is the selected option, deselect it
    if (newOption.value === selectedOption.value) {
      setOptions(
        options.map((option) =>
          option.value === newOption.value
            ? {
                ...option,
                state: 'default',
              }
            : option,
        ),
      );
      return;
    }

    // If the new option is the capital of the selected country
    // or the country of the selected capital, remove both options
    if (
      data[newOption.value] === selectedOption.value ||
      newOption.value === data[selectedOption.value]
    ) {
      setOptions(
        options.filter(
          (option) => ![newOption, selectedOption].includes(option),
        ),
      );
      return;
    }

    // If the new option is not the capital of the selected country
    // nor the country of the selected capital, mark both options as wrong
    setOptions(
      options.map((option) =>
        [newOption, selectedOption].includes(option)
          ? { ...option, state: 'wrong' }
          : option,
      ),
    );
  }

  if (options.length === 0) {
    return (
      <View gap={2} align="start">
        <Text variant="title-5">Congratulations 🎉</Text>
        <Text variant="featured-3" color="neutral-faded">
          You cleared the board!
        </Text>
        <Button
          className="mt-x4"
          size="large"
          color="primary"
          onClick={() =>
            setOptions(
              shuffle(
                Object.entries(data)
                  .flat()
                  .map((value) => ({ value, state: 'default' })),
              ),
            )
          }
        >
          Try again
        </Button>
      </View>
    );
  }

  return (
    <View gap={8} align="center" textAlign="center">
      <Text as="h1" variant="title-3" weight="bold">
        Country-Capital Pairing Game
      </Text>
      <Text variant="featured-3" color="neutral-faded">
        Select a country and then its capital.
        <br />
        Try to clear the board!
      </Text>
      <View direction="row" justify="center" gap={2}>
        {options.map((option) => (
          <Button
            key={option.value}
            size="xlarge"
            color={optionStateButtonColorMap[option.state]}
            onClick={() => handleButtonClick(option)}
          >
            {option.value}
          </Button>
        ))}
      </View>
    </View>
  );
}
