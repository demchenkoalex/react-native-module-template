//
//  LibraryTemplate.m
//  LibraryTemplate
//
//  Created by Alex Demchenko on 01/11/2019.
//  Copyright © 2019 Alex Demchenko. All rights reserved.
//

#import "LibraryTemplate.h"

@implementation LibraryTemplate

RCT_EXPORT_MODULE();

+ (void)hello {}

- (NSDictionary *)constantsToExport
{
  return @{ @"count": @1 };
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end
