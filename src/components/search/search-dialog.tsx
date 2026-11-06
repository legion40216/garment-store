"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Opens a small search box. Submitting goes to /products?q=..., which the
// listing page already knows how to filter by.
export default function SearchDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) return;

    setIsOpen(false);
    setQuery("");
    router.push(`/products?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={<Button variant="ghost" size="icon" aria-label="Search" />}
      >
        <Search className="size-5" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogTitle>Search products</DialogTitle>
        <DialogDescription className="sr-only">
          Search the store by name, description or season.
        </DialogDescription>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="search"
            name="q"
            value={query}
            maxLength={80}
            placeholder="Try &quot;coat&quot; or &quot;winter&quot;"
            aria-label="Search products"
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button type="submit" disabled={query.trim() === ""}>
            Search
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
