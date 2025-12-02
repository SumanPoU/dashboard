"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface FilterPanelProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
  onReset: () => void;
}

export default function FilterPanel({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  searchTerm,
  onSearchChange,
  onReset,
}: FilterPanelProps) {
  const isFiltered =
    selectedCategory !== "All" || selectedType !== "All" || searchTerm !== "";

  return (
    <Card className="p-4 border-0 shadow-sm">
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Filters</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Search
            </label>
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-background"
            />
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Category
            </label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Type
            </label>
            <Select value={selectedType} onValueChange={onTypeChange}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reset Button */}
        {isFiltered && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="w-full bg-transparent"
          >
            <X className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
        )}
      </div>
    </Card>
  );
}
