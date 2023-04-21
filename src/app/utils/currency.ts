import { IItem } from "../../models/types";
import { ApiService } from "../shared/services/api/api.service";
import { EMPTY, switchMap } from "rxjs";
import { currencyCodeObject } from "./currency-codes";

interface CurrencyKeyValue {
  [key: string]: number;
}

export function getCurrencySymbol(currencyCode: string) {
  if (!currencyCode) return null;

  const symbolKey = Object.keys(currencyCodeObject).find(
    (code) => code === currencyCode
  );

  if (!symbolKey) return null;

  return currencyCodeObject[currencyCode]?.symbol;
}
export function calculateItineraryCost(
  itinerary: IItem[],
  baseCurrency: string,
  apiService: ApiService
) {
  if (!itinerary) return 0;

  let currencyCodeArray: CurrencyKeyValue = {};

  let cost = 0;

  itinerary.forEach((item) => {
    const currencyTotal: number = currencyCodeArray[`${item?.currency}`];
    if (currencyTotal) {
      currencyCodeArray[`${item.currency}`] = currencyTotal + item.cost;
    } else {
      currencyCodeArray[`${item.currency}`] = item.cost;
    }
  });

  if (Object.keys(currencyCodeArray).length > 0) {
    const keyArray = Object.keys(currencyCodeArray);

    keyArray.forEach((currencyCode) => {
      apiService
        .convertAmountToCurrency(
          currencyCode,
          baseCurrency,
          currencyCodeArray[`${currencyCode}`]
        )
        .pipe(
          switchMap((currencyApiResponse) => {
            cost = cost + currencyApiResponse.result;
            return EMPTY;
          })
        )
        .subscribe();
    });
  }

  return cost;
}
