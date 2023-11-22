// import { Place } from "../place";

import { Place } from "../place";

export interface Archive {
  _id: string;
  authorId: string;
  title: string;
  places: string[];
  placesNumber: number;
}

export interface ArchiveDetail {
  _id: string;
  authorId: string;
  title: string;
  places: Array<Place>;
  placesNumber: number;
}

// export interface ArchiveDetail extends Omit<Archive, "places"> {
//   places: Place[];
// }
