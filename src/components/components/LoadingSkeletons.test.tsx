import { render, screen } from "@testing-library/react";
import { PetGridSkeleton, PetDetailsSkeleton } from "./LoadingSkeletons";

describe("loading skeletons", () => {
  it("announces the pet grid as busy while preserving card-sized placeholders", () => {
    render(<PetGridSkeleton count={3} />);

    expect(screen.getByLabelText("Loading pets")).toHaveAttribute(
      "aria-busy",
      "true",
    );
    expect(document.querySelectorAll(".MuiCard-root")).toHaveLength(3);
  });

  it("provides an accessible loading state for pet details", () => {
    render(<PetDetailsSkeleton />);

    expect(screen.getByLabelText("Loading pet details")).toHaveAttribute(
      "aria-busy",
      "true",
    );
  });
});
