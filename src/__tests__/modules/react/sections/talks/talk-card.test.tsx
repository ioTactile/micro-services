// import { render, fireEvent, screen } from "@testing-library/react";
// import TalkCard from "@/modules/react/sections/talks/_components/talk-card";
// import { useRouter } from "next/navigation";
// import { describe, it, expect, vi } from "vitest";
// import { mockTalk } from "@/__tests__/fixtures/talk.fixture";

// vi.mock("next/navigation", () => ({
//   useRouter: vi.fn(),
// }));

// const mockRouter = {
//   push: vi.fn(),
//   back: vi.fn(),
//   forward: vi.fn(),
//   refresh: vi.fn(),
//   replace: vi.fn(),
//   prefetch: vi.fn(),
// };

// describe("TalkCard", () => {
//   it("devrait afficher correctement les informations du talk", () => {
//     vi.mocked(useRouter).mockReturnValue(mockRouter);

//     render(<TalkCard talk={mockTalk} />);

//     expect(screen.getByText("Test Talk")).toBeInTheDocument();
//     expect(screen.getByText("Test content")).toBeInTheDocument();
//     expect(screen.getByText("John Doe")).toBeInTheDocument();
//   });

//   it("devrait naviguer vers la page du talk au clic", () => {
//     vi.mocked(useRouter).mockReturnValue(mockRouter);

//     render(<TalkCard talk={mockTalk} />);

//     fireEvent.click(screen.getByText("Test Talk"));

//     expect(mockRouter.push).toHaveBeenCalledWith(
//       `/talks/${mockTalk.id}/${mockTalk.title}`
//     );
//   });
// });
