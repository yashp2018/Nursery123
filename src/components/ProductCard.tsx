import { Link } from "react-router-dom";
import { ShoppingCart, Clock, Building2 } from "lucide-react";
import { Variety } from "@/data/products";
import SeasonAvailability from "@/components/SeasonAvailability";

interface ProductCardProps {
  variety: Variety;
}

export default function ProductCard({ variety }: ProductCardProps) {
  return (
    <Link
      to={`/product/${variety.id}`}
      className="product-card block bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all hover:-translate-y-2 group border border-border/50"
      data-variety-id={variety.id}
      id={`product-card-${variety.id}`}
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={variety.image}
          alt={`${variety.name} ${variety.cropName} seedlings`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-xs font-bold bg-primary text-primary-foreground px-3 py-1.5 rounded-full shadow-card">
            {variety.cropName}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          {variety.stock > 0 ? (
            <span className="text-xs font-semibold bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="text-xs font-semibold bg-destructive text-destructive-foreground px-3 py-1.5 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Building2 className="w-3 h-3" />
          <span>{variety.company}</span>
          <span className="text-border">•</span>
          <Clock className="w-3 h-3" />
          <span>{variety.durationDays} days</span>
        </div>

        <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
          {variety.name}
        </h3>

        <p className="text-xs text-muted-foreground mb-4">Min order: {variety.minOrderQty.toLocaleString()} plants</p>

        {variety.availableMonths && variety.availableMonths.length > 0 && (
          <div className="mb-4">
            <SeasonAvailability availableMonths={variety.availableMonths} />
          </div>
        )}

        <div className="flex items-end justify-between border-t border-border/50 pt-4">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">From (15K+ rate)</p>
            <p className="text-2xl font-bold text-primary font-sans">
              ₹{variety.price15k.toFixed(1)}
              <span className="text-xs font-normal text-muted-foreground">/plant</span>
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center group-hover:gradient-cta group-hover:text-primary-foreground group-hover:shadow-card transition-all">
            <ShoppingCart className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
