import { Coordinates } from "@mapbox/mapbox-sdk/lib/classes/mapi-request";
import { createContext, useState, useContext } from "react";

interface DirectionContextType {
  directions: boolean;
  setDirections: React.Dispatch<React.SetStateAction<boolean>>;
  searchMarker: Coordinates[];
  setSearchMarker: React.Dispatch<React.SetStateAction<Coordinates[]>>;
}

const DirectionContext = createContext<DirectionContextType>(
  {} as DirectionContextType
);

export const useDirection = () => {
  const directionContext = useContext(DirectionContext);

  if (process.env.NODE_ENV !== "production") {
    if (!directionContext) {
      throw new Error(
        "useDirection must be wrapped in a <DirectionProvider />"
      );
    }
  }

  return directionContext;
};

export const DirectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [directions, setDirections] = useState<boolean>(false);
  const [searchMarker, setSearchMarker] = useState<Coordinates[]>([]);

  return (
    <DirectionContext.Provider
      value={{ directions, setDirections, searchMarker, setSearchMarker }}
    >
      {children}
    </DirectionContext.Provider>
  );
};

export default DirectionContext;
