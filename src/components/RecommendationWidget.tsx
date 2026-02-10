import React, { useEffect, useRef } from "react";
import { Card } from "react-bootstrap";

interface RecommendationWidgetProps {
  siteId?: string;
  categories?: string;
  layout?: string;
  theme?: string;
  limit?: number;
  title?: string;
}

const RecommendationWidget: React.FC<RecommendationWidgetProps> = ({
  siteId = "12",
  categories = "History,Pets",
  layout = "grid",
  theme = "light",
  limit = 4,
  title = "You might also like these websites..."
}) => {
  const widgetIdRef = useRef(`recommendation-widget-${Math.random().toString(36).substring(7)}`);
  const widgetId = widgetIdRef.current;

  useEffect(() => {
    // Check if the RecommendationWidget class is available
    if ((window as any).RecommendationWidget) {
      try {
        new (window as any).RecommendationWidget(widgetId, {
          siteId,
          categories,
          layout,
          theme,
          limit,
          showImages: true,
          showDescription: true,
          showTags: true,
          showTitle: true,
          title,
          imageSize: '100px',
          imageShape: 'square',
          autoRotate: false,
          openInNewTab: true,
          animation: 'fade',
          hoverEffect: 'scale',
          columns: 4,
          descriptionLength: 60
        });
      } catch (error) {
        console.error("Error initializing RecommendationWidget:", error);
      }
    } else {
      console.warn("RecommendationWidget script not loaded yet");
    }
  }, [siteId, categories, layout, theme, limit, title, widgetId]);

  return (
    <div className="row w-100 justify-content-center mt-4" style={{ maxWidth: 900 }}>
      <div className="col-12">
        <Card className="shadow-lg border-0 mb-4">
          <Card.Body>
            <div 
              id={widgetId}
              data-rec-widget
              data-site-id={siteId}
              data-categories={categories}
              data-layout={layout}
              data-theme={theme}
              data-limit={limit}
            ></div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default RecommendationWidget;
