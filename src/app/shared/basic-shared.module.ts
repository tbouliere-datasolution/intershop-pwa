import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { DirectivesModule } from 'ish-core/directives.module';
import { IconModule } from 'ish-core/icon.module';
import { PipesModule } from 'ish-core/pipes.module';

const importExportModules = [CommonModule, DirectivesModule, IconModule, PipesModule, RouterModule, TranslateModule];

@NgModule({
  imports: [...importExportModules],
  exports: [...importExportModules],
})
export class BasicSharedModule {}
