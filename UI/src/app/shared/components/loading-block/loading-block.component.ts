import { Component, OnInit } from "@angular/core";
import { LoadingBlockService } from "../../services/loading-block.service";

@Component({
  selector: "app-loading-block",
  templateUrl: "./loading-block.component.html",
  styleUrls: ["./loading-block.component.scss"]
})
export class LoadingBlockComponent implements OnInit {
  constructor(private loadingService: LoadingBlockService) {}

  ngOnInit() {}
}
