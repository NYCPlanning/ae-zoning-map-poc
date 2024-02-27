import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3000/api/boroughs", () => {
    return HttpResponse.json({
      boroughs: [
        {
          id: 1,
          title: "Manhattan",
          abbr: "MN",
        },
        {
          id: "2",
          title: "Bronx",
          abbr: "BX",
        },
        {
          id: "3",
          title: "Brooklyn",
          abbr: "BK",
        },
        {
          id: "4",
          title: "Queens",
          abbr: "QN",
        },
        {
          id: "5",
          title: "Staten Island",
          abbr: "SI",
        },
      ],
    });
  }),
];
